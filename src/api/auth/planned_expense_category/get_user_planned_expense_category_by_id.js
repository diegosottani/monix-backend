import { supabase } from '../../../init.js';

export const get_user_planned_expense_category_by_id = async (req, res) => {
    try{
        const { data, error } = await supabase
        .from('planned_expense_category')
        .select(`
            id,
            planned_expense_id (
                id,
                month,
                year,
                user_id (
                    id,
                    name
                )
            ),
            category_id (
                id,
                name
            ),
            value
        `)
        .eq('planned_expense_id', req.params.id)

        if (error) throw error;
    
        res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao recuperar categorias das entradas planejadas' });
    }
}