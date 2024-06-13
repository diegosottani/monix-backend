import { supabase } from "../../../init";

export const post_user_category = async (req, res) => {
  const validTypeOfCategories = ["incoming", "expense", "investment"];

  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "O nome da categoria é obrigatório" });
    }

    if (!validTypeOfCategories.includes(req.body.type_category)) {
      return res.status(400).json({ error: "Tipo de categoria inválido" });
    }

    const { error } = await supabase
      .from("categories")
      .insert({ user_id: req.user.id, name: req.body.name, type_category: req.body.type_category });

    if (error) throw error;

    res.status(200).send("Categoria criada com sucesso");
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
};
