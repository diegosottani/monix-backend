import { supabase } from '../../../init.js';

export const get_user_planned_investment = async (req, res) => {
    try {
        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);
        
        if (isNaN(year)) {
            res.status(400).json({ error: 'É necessário informar o ano como um número válido' });
            return;
        }

        let query = supabase
            .from('planned_investment')
            .select(`
                id,
                user_id,
                month,
                year
            `)
            .eq('year', year)
            .eq('user_id', req.user.id);
            
        if (!isNaN(month) && month !== 0) {
            query = query.eq('month', month);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao recuperar investimentos planejados' });
    }
}
