import express from 'express'
import { get_user } from './get_user.js';
import { get_user_categories } from './categories/get_user_categories.js';
import { post_user_category } from './categories/post_user_category.js';
import { put_user_category } from './categories/put_user_category.js';
import { delete_user_category } from './categories/delete_user_category.js';
import { get_subcategories_by_categoryId } from './subcategories/get_subcategories_by_categoryId.js';
import { post_user_subcategory } from './subcategories/post_user_subcategory.js';
import { put_user_subcategory } from './subcategories/put_user_subcategory.js';
import { delete_user_subcategory } from './subcategories/delete_user_subcategory.js';
import { get_user_expenses } from './expenses/get_user_expenses.js';
import { get_user_expense_by_id } from './expenses/get_user_expense_by_id.js';
import { post_user_expenses } from './expenses/post_user_expenses.js';
import { put_user_expenses } from './expenses/put_user_expenses.js';
import { delete_user_expenses } from './expenses/delete_user_expenses.js';
import { get_user_planned_expense } from './planned_expense/get_user_planned_expense.js';
import { post_user_planned_expense } from './planned_expense/post_user_planned_expenses.js';
import { get_user_typeofexpenses } from './type_expenses/get_user_typeofexpenses.js';
import { put_user_typeofexpenses } from './type_expenses/put_user_typeofexpenses.js';
import { put_user_planned_expense } from './planned_expense/put_user_planned_expense.js';
import { delete_user_planned_expense } from './planned_expense/delete_user_planned_expense.js';
import { get_members, post_members, put_members, delete_members } from './controllers/membersController.js';
import { get_user_cards, post_user_cards, put_user_cards, delete_user_cards } from './controllers/cardsController.js';
import { get_investments, get_investments_by_id, post_investments, put_investments, delete_investments } from './investments.js';
import { get_user_planned_incoming_category } from './planned_incoming_category/get_user_planned_incoming_category.js';
import { get_user_planned_incoming_category_by_id } from './planned_incoming_category/get_user_planned_incoming_category_by_id.js';
import { post_user_planned_incoming_category } from './planned_incoming_category/post_user_planned_incoming_category.js';
import { put_user_planned_incoming_category } from './planned_incoming_category/put_user_planned_incoming_category.js';
import { delete_user_planned_incoming_category } from './planned_incoming_category/delete_user_planned_incoming_category.js';
import { get_user_goals } from './goals/get_user_goals.js';
import { post_user_goals } from './goals/post_user_goals.js';
import { put_user_goals } from './goals/put_user_goals.js';
import { delete_user_goals } from './goals/delete_user_goals.js';
import { get_user_incomings } from './incomings/get_user_incomings.js';
import { get_user_incoming_by_id } from './incomings/get_user_incoming_by_id.js';
import { post_user_incomings } from './incomings/post_user_incomings.js';
import { put_user_incomings } from './incomings/put_user_incomings.js';
import { delete_user_incomings } from './incomings/delete_user_incomings.js';
import { get_financial_summary } from './controllers/financialSummaryController.js';
import { get_user_planned_expense_subcategory_by_planned_expense_category_id } from './planned_expense_subcategory/get_user_planned_expense_subcategory.js';
import { post_user_planned_expense_subcategory } from './planned_expense_subcategory/post_user_planned_expense_subcategory.js';
import { put_user_planned_expense_subcategory } from './planned_expense_subcategory/put_user_planned_expense_subcategory.js';
import { delete_user_planned_expense_subcategory } from './planned_expense_subcategory/delete_user_planned_expense_subcategory.js';
import { get_user_planned_expense_category } from './planned_expense_category/get_user_planned_expense_category.js';
import { get_user_planned_expense_category_by_id } from './planned_expense_category/get_user_planned_expense_category_by_id.js';
import { post_user_planned_expense_category } from './planned_expense_category/post_user_planned_expense_category.js';
import { post_user_planned_incoming } from './planned_incoming/post_user_planned_incoming.js';
import { get_user_planned_incoming } from './planned_incoming/get_user_planned_incoming.js';
import { put_user_planned_incoming } from './planned_incoming/put_user_planned_incoming.js';
import { delete_user_planned_incoming } from './planned_incoming/delete_user_planned_incoming.js';
import { post_user_planned_investment } from './planned_investment/post_user_planned_investment.js';
import { get_user_planned_investment } from './planned_investment/get_user_planned_investment.js';
import { put_user_planned_investment } from './planned_investment/put_user_planned_investment.js';
import { delete_user_planned_investment } from './planned_investment/delete_user_planned_investment.js';
import { get_user_planned_investment_category } from './planned_investment_category/get_user_planned_investment_category.js';
import { get_user_planned_investment_category_by_id } from './planned_investment_category/get_user_planned_investment_category_by_id.js';
import { post_user_planned_investment_category } from './planned_investment_category/post_user_planned_investment_category.js';
import { put_user_planned_investment_category } from './planned_investment_category/put_user_planned_investment_category.js';
import { delete_user_planned_investment_category } from './planned_investment_category/delete_user_planned_investment_category.js';
import { delete_user_planned_expense_category } from './planned_expense_category/delete_user_planned_expense_category.js';
import { put_user_planned_expense_category } from './planned_expense_category/put_user_planned_expense_category.js';
import { put_user } from './user/put_user.js';
import { delete_user } from './user/delete_user.js';
import { get_accounts } from './accounts/get_user_accounts.js';
import { get_account_by_id } from './accounts/get_user_account_by_id.js';
import { post_account } from './accounts/post_user_account.js';
import { put_account } from './accounts/put_user_account.js';
import { delete_account } from './accounts/delete_user_account.js';
import { get_goals_info } from './goals/post_view_goals.js';
import { get_releases } from './releases/get_releases.js';
import { get_transactions_by_category } from './transactions/get_transactions_by_category.js';
import { put_transactions_by_category } from './transactions/put_transactions_by_category.js';
import { get_user_goal_deposits } from './goal_deposits/get_user_goal_deposits.js';
import { post_user_goal_deposits } from './goal_deposits/post_user_goal_deposits.js';
import { get_user_planned_investment_subcategory_by_planned_investment_category_id } from './planned_investment_subcategory/get_user_planned_investment_subcategory.js';
import { post_user_planned_investment_subcategory } from './planned_investment_subcategory/post_user_planned_investment_subcategory.js';
import { put_user_planned_investment_subcategory } from './planned_investment_subcategory/put_user_planned_investment_subcategory.js';
import { delete_user_planned_investment_subcategory } from './planned_investment_subcategory/delete_user_planned_investment_subcategory.js';

export const auth_router = express.Router();
//user
auth_router.get('/user/profile', get_user)
auth_router.put('/user/profile', put_user)
auth_router.delete('/user/profile', delete_user)
//accounts
auth_router.get('/user/accounts/:active', get_accounts)
auth_router.get('/user/accounts/:id', get_account_by_id)
auth_router.post('/user/accounts', post_account)
auth_router.put('/user/accounts/:id', put_account)
auth_router.delete('/user/accounts/:id', delete_account)
auth_router.get('/user/goals_info', get_goals_info)
//categories
auth_router.get('/user/categories/:type', get_user_categories)
auth_router.post('/user/categories', post_user_category)
auth_router.put('/user/categories/:id', put_user_category)
auth_router.delete('/user/categories/:id', delete_user_category)
//subcategories
auth_router.get('/user/subcategories/:id', get_subcategories_by_categoryId)
auth_router.post('/user/subcategories', post_user_subcategory)
auth_router.put('/user/subcategories/:id', put_user_subcategory)
auth_router.delete('/user/subcategories/:id', delete_user_subcategory)
//expenses
auth_router.get('/user/expenses', get_user_expenses)
auth_router.get('/user/expenses/:id', get_user_expense_by_id)
auth_router.post('/user/expenses', post_user_expenses)
auth_router.put('/user/expenses/:id', put_user_expenses)
auth_router.delete('/user/expenses/:id', delete_user_expenses)
//goals
auth_router.get('/user/goals', get_user_goals)
auth_router.post('/user/goals', post_user_goals)
auth_router.put('/user/goals/:id', put_user_goals)
auth_router.delete('/user/goals/:id', delete_user_goals)
//goal_deposits
auth_router.get('/user/goal_deposits/:id', get_user_goal_deposits)
auth_router.post('/user/goal_deposits', post_user_goal_deposits)
//typesofexpenses
auth_router.get('/user/typeofexpenses', get_user_typeofexpenses)
auth_router.put('/user/typeofexpenses/:id', put_user_typeofexpenses)
//planned_expenses
auth_router.get('/user/planned_expense', get_user_planned_expense)
auth_router.post('/user/planned_expense', post_user_planned_expense)
auth_router.put('/user/planned_expense/:id', put_user_planned_expense)
auth_router.delete('/user/planned_expense/:id', delete_user_planned_expense)
//planned_expenses_category
auth_router.get('/user/planned_expense_category', get_user_planned_expense_category)
auth_router.get('/user/planned_expense_category/:id', get_user_planned_expense_category_by_id)
auth_router.post('/user/planned_expense_category', post_user_planned_expense_category)
auth_router.put('/user/planned_expense_category/:id', put_user_planned_expense_category)
auth_router.delete('/user/planned_expense_category/:id', delete_user_planned_expense_category)
//planned_expenses_subcategory
auth_router.get('/user/planned_expense_subcategory/:id', get_user_planned_expense_subcategory_by_planned_expense_category_id)
auth_router.post('/user/planned_expense_subcategory', post_user_planned_expense_subcategory)
auth_router.put('/user/planned_expense_subcategory/:id', put_user_planned_expense_subcategory)
auth_router.delete('/user/planned_expense_subcategory/:id', delete_user_planned_expense_subcategory)
//planned_incoming
auth_router.get('/user/planned_incoming', get_user_planned_incoming)
auth_router.post('/user/planned_incoming', post_user_planned_incoming)
auth_router.put('/user/planned_incoming/:id', put_user_planned_incoming)
auth_router.delete('/user/planned_incoming/:id', delete_user_planned_incoming)
//planned_incoming_category
auth_router.get('/user/planned_incoming_category', get_user_planned_incoming_category)
auth_router.get('/user/planned_incoming_category/:id', get_user_planned_incoming_category_by_id)
auth_router.post('/user/planned_incoming_category', post_user_planned_incoming_category)
auth_router.put('/user/planned_incoming_category/:id', put_user_planned_incoming_category)
auth_router.delete('/user/planned_incoming_category/:id', delete_user_planned_incoming_category)
//planned_investment
auth_router.get('/user/planned_investment', get_user_planned_investment)
auth_router.post('/user/planned_investment', post_user_planned_investment)
auth_router.put('/user/planned_investment/:id', put_user_planned_investment)
auth_router.delete('/user/planned_investment/:id', delete_user_planned_investment)
//planned_investment_category
auth_router.get('/user/planned_investment_category', get_user_planned_investment_category)
auth_router.get('/user/planned_investment_category/:id', get_user_planned_investment_category_by_id)
auth_router.post('/user/planned_investment_category', post_user_planned_investment_category)
auth_router.put('/user/planned_investment_category/:id', put_user_planned_investment_category)
auth_router.delete('/user/planned_investment_category/:id', delete_user_planned_investment_category)
//planned_investment_subcategory
auth_router.get('/user/planned_investment_subcategory/:id', get_user_planned_investment_subcategory_by_planned_investment_category_id)
auth_router.post('/user/planned_investment_subcategory', post_user_planned_investment_subcategory)
auth_router.put('/user/planned_investment_subcategory/:id', put_user_planned_investment_subcategory)
auth_router.delete('/user/planned_investment_subcategory/:id', delete_user_planned_investment_subcategory)
//members
auth_router.get('/user/members', get_members)
auth_router.post('/user/members', post_members)
auth_router.put('/user/members/:id', put_members)
auth_router.delete('/user/members/:id', delete_members)
//cards
auth_router.get('/user/cards/:active', get_user_cards)
auth_router.post('/user/cards', post_user_cards)
auth_router.put('/user/cards/:id', put_user_cards)
auth_router.delete('/user/cards/:id', delete_user_cards)
//investments
auth_router.get('/user/investments', get_investments)
auth_router.get('/user/investments/:id', get_investments_by_id)
auth_router.post('/user/investments', post_investments)
auth_router.put('/user/investments/:id', put_investments)
auth_router.delete('/user/investments/:id', delete_investments)
//incomings
auth_router.get('/user/incomings', get_user_incomings)
auth_router.get('/user/incomings/:id', get_user_incoming_by_id)
auth_router.post('/user/incomings', post_user_incomings)
auth_router.put('/user/incomings/:id', put_user_incomings)
auth_router.delete('/user/incomings/:id', delete_user_incomings)
//views
auth_router.get('/user/financial_summary', get_financial_summary)
auth_router.get('/user/releases', get_releases)
//transactions
auth_router.get('/user/transactions', get_transactions_by_category)
auth_router.put('/user/transactions', put_transactions_by_category)
