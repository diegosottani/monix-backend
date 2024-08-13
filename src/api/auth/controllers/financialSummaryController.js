import { getFinancialSummary } from "../services/financialSummaryService";

export const get_financial_summary = async (req, res) => {
  try {
    const userId = req.user.id;
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    if (!startDate || !endDate) {
      res.status(400).json({ error: 'É necessário informar o período' });
    }

    const summary = await getFinancialSummary(userId, startDate, endDate);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Erro ao acessar o resumo financeiro:", error);
    res.status(500).json({ error: "Erro ao acessar o resumo financeiro" });
  }
};
