import { supabase } from '../../../init.js';

export const delete_user_category = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'O id da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

    if (error) throw error;

    return res.status(200).send("Categoria excluída com sucesso")
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    return res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
};