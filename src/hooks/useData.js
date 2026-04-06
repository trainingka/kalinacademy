import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useData = create((set, get) => ({
  yearlyGoals: [],
  monthlyKpis: [],
  tasks: [],
  loading: false,

  fetchYearlyGoals: async () => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('kpisync_yearly_goals')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error(error)
    else set({ yearlyGoals: data || [] })
    set({ loading: false })
  },

  fetchMonthlyKpis: async (goalId) => {
    set({ loading: true })
    let query = supabase
      .from('kpisync_monthly_kpis')
      .select('*, kpisync_yearly_goals(*)')
    
    if (goalId) {
      query = query.eq('yearly_goal_id', goalId)
    }
    
    const { data, error } = await query.order('month', { ascending: true })
    
    if (error) console.error(error)
    else set({ monthlyKpis: data || [] })
    set({ loading: false })
  },

  fetchTasks: async (userId) => {
    const query = supabase.from('kpisync_tasks').select(`
      *,
      kpisync_monthly_kpis (
        *,
        kpisync_yearly_goals (*)
      )
    `)
    
    if (userId) query.eq('assigned_to', userId)
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) console.error(error)
    else set({ tasks: data || [] })
  },

  createYearlyGoal: async (goal) => {
    const { data, error } = await supabase
      .from('kpisync_yearly_goals')
      .insert([goal])
      .select()
    
    if (error) throw error
    
    // Auto-breakdown: Create 12 monthly KPIs
    const yearlyGoal = data[0]
    const monthlyValue = (yearlyGoal.target_value / 12).toFixed(2)
    const monthlyRecords = Array.from({ length: 12 }, (_, i) => ({
      yearly_goal_id: yearlyGoal.id,
      month: i + 1,
      target_value: monthlyValue,
      current_progress: 0
    }))

    const { error: monthlyError } = await supabase
      .from('kpisync_monthly_kpis')
      .insert(monthlyRecords)
    
    if (monthlyError) throw monthlyError
    
    await get().fetchYearlyGoals()
    return yearlyGoal
  },

  updateTaskStatus: async (taskId, status) => {
    const { error } = await supabase
      .from('kpisync_tasks')
      .update({ status })
      .eq('id', taskId)
    
    if (error) throw error
    await get().fetchTasks()
    await get().fetchStuckTasks()
  },

  fetchStuckTasks: async () => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('kpisync_tasks')
      .select(`
        *,
        kpisync_profiles:assigned_to (email, role),
        kpisync_monthly_kpis (
          *,
          kpisync_yearly_goals (*)
        )
      `)
      .eq('status', 'stuck')
      .order('created_at', { ascending: false })
    
    if (error) console.error(error)
    else set({ tasks: data || [] })
    set({ loading: false })
  }
}))
