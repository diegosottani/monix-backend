import { supabase } from '../../../init.js';

export const get_user_planned_investment_subcategory_by_planned_investment_category_id = async (req, res) => {
    try {
        const subcategory_id = req.query.subcategory;
        
        if (!subcategory_id) {
            res.status(400).json({ error: 'É necessário informar subcategory_id' });
            return;
        }

        const {data, error} = await supabase
        .from('planned_investment_subcategory')
        .select(`
            id,
            planned_investment_category_id(
                id,
                category_id (
                    id, 
                    name
                ),
                value
            ),
            subcategory_id(
                id,
                name
            ),
            value
        `)
        .eq('planned_investment_category_id', req.params.id)
        .eq('subcategory_id', subcategory_id);

        if (error) {
            throw error;
        }

        res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao recuperar subcategorias das despesas planejadas' });
    }
}