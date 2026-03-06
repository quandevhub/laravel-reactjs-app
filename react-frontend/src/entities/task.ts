export interface RegisterData {
    id?: number,
    title: string,
    description: string,
    status: string,
    due_date: string,
    priority: string,
    assigned_to: number,
    created_by: number,
    created_at?: string
}