import { supabase } from '../../../init.js';

export const get_user_categories = async (req, res) => {

  try {
    const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', req.user.id)
    .eq("type_category", req.params.type);

    if (error) throw error;

    return res.status(200).send(data)
  } catch (error) {
    console.error('Erro ao recuperar categorias:', error);
    return res.status(500).json({ error: 'Erro ao recuperar categorias' });
  }
};