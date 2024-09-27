import { supabase } from '../../../init.js';

export const get_subcategories_by_categoryId = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
    .from('subcategories')
    .select(`
      id, 
      name, 
      category_id (
        id, 
        name
      )
    `)
    .eq('category_id', id)

    res.status(200).send(data)
  } catch (error) {
    console.error('Erro ao recuperar subcategorias:', error);
    res.status(500).json({ error: 'Erro ao recuperar subcategorias' });
  }
};