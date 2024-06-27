import { supabase } from "../../../init";
import { groupByDate } from "../../../utils/groupByDate";

export const get_releases = async (req, res) => {
  try {
    const fields = `id, date, description, account_id (name), value`;
    const incomings = await getData("incomings", fields, req);
    const expenses = await getData("expenses", fields, req);
    const investments = await getData("investments", fields, req);
    incomings.map((item) => (item["type"] = "incomings"));
    expenses.map((item) => (item["type"] = "expenses"));
    investments.map((item) => (item["type"] = "investments"));
    const releases = [...incomings, ...expenses, ...investments];
    const groupReleasesByDate = groupByDate(releases);

    res.status(200).json(groupReleasesByDate);
  } catch (error) {
    console.error("Erro ao acessar o resumo financeiro:", error);
    res.status(500).json({ error: "Erro ao acessar o resumo financeiro" });
  }
};

async function getData(table, fields, req) {
  const userId = req.user.id;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  const { data, error } = await supabase
    .from(table)
    .select(fields)
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}
