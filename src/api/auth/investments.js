import { supabase } from "../../init";
import { groupByDate } from "../../utils/groupByDate"

export const get_investments = async (req, res) => {
  try {
    const userId = req.user.id;
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const { data, error } = await supabase
      .from("investments")
      .select(
        `
      id,
      user_id,
      goal_id (
        id,
        name,
        initial_value,
        deadline,
        desired_value
      ),
      category_id (
        id,
        name
      ),
      member_id (
        id,
        name
      ),
      account_id (
        id, 
        name
      ),
      date,
      value,
      description,
      status,
      type     
      `
      )
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true });

    if (error) throw error;
    res.status(200).send(groupByDate(data));
  } catch (error) {
    console.error("Erro ao recuperar investimentos:", error);
    res.status(500).json({ error: "Erro ao recuperar os investimentos" });
  }
};

export const get_investments_by_id = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select(`*`)
      .eq("user_id", req.user.id)
      .eq("id", req.params.id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar dados de investimento:", error);
    res.status(500).json({ error: "Erro ao buscar dados de investimento" });
  }
};

export const post_investments = async (req, res) => {
  try {
    if (
      !req.body.goal ||
      !req.body.category ||
      !req.body.member ||
      !req.body.account ||
      !req.body.date ||
      !req.body.value ||
      !req.body.description ||
      !req.body.status
    ) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const { error } = await supabase.from("investments").insert({
      user_id: req.user.id,
      goal_id: req.body.goal,
      category_id: req.body.category,
      member_id: req.body.member,
      account_id: req.body.account,
      date: req.body.date,
      value: req.body.value,
      status: req.body.status,
      description: req.body.description,
    });

    if (error) throw error;

    res.status(200).send("Investimento cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar investimento:", error);
    res.status(500).json({ error: "Erro ao cadastrar investimento" });
  }
};

export const put_investments = async (req, res) => {
  try {
    const id = req.params.id;

    if (
      !req.body.goal ||
      !req.body.category ||
      !req.body.member ||
      !req.body.account ||
      !req.body.date ||
      !req.body.value ||
      !req.body.description ||
      !req.body.status
    ) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const updatedInvestment = {
      goal_id: req.body.goal,
      category_id: req.body.category,
      member_id: req.body.member,
      account_id: req.body.account,
      date: req.body.date,
      value: req.body.value,
      status: req.body.status,
      description: req.body.description,
    };

    const { error } = await supabase.from("investments").update(updatedInvestment).eq("id", id);
    if (error) throw error;

    res.status(200).send("dados atualizado com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar os dados" });
  }
};

export const delete_investments = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "O id do investimento é obrigatório" });
    }

    const { error } = await supabase.from("investments").delete().eq("id", id);
    if (error) throw error;

    res.status(200).send("investimento excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir investimento:", error);
    res.status(500).json({ error: "Erro ao excluir investimento" });
  }
};
