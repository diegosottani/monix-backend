import { supabase } from '../../../init.js';

export const post_user_subcategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'O nome da subcategoria é obrigatório' });
    }

    const { error } = await supabase
    .from('subcategories')
    .insert({ category_id: req.body.category_id, name: req.body.name })

    if (error) throw error;

    return res.status(200).send("Subcategoria criada com sucesso")
  } catch (error) {
    console.error('Erro ao criar subcategoria:', error);
    return res.status(500).json({ error: 'Erro ao recuperar subcategoria' });
  }
};