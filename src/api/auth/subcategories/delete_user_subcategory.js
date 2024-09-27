import { supabase } from '../../../init.js';
import { subcategoryOnDefault } from "../../../database/updateDefaultOnDelete.js"

export const delete_user_subcategory = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) {
      res.status(400).json({ error: 'O id da subcategoria é obrigatório' });
    }
    
    await subcategoryOnDefault(id, userId);
    
    const { error } = await supabase
    .from('subcategories')
    .delete()
    .eq('id', id)

    if (error) throw error;

    res.status(200).send("Subcategoria excluída com sucesso")
  } catch (error) {
    console.error('Erro ao excluir subcategoria:', error);
    res.status(500).json({ error: 'Erro ao excluir subcategoria' });
  }
};