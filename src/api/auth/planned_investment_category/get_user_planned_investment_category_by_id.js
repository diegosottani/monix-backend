import { supabase } from '../../../init.js';

export const get_user_planned_investment_category_by_id = async (req, res) => {
    try{
        const { data, error } = await supabase
        .from('planned_investment_category')
        .select(`
            id,
            planned_investment_id (
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
        .eq('planned_investment_id', req.params.id)

        if (error) throw error;
    
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Erro ao recuperar categorias dos investimentos planejados' });
    }
}