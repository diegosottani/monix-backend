import { supabase } from '../../../init.js';

export const get_user_planned_incoming = async (req, res) => {
    try {
        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);
        
        if (isNaN(year)) {
            return res.status(400).json({ error: 'É necessário informar o ano como um número válido' });
        }

        let query = supabase
            .from('planned_incoming')
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

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}
