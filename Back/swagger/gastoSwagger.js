/**
 * @swagger
 * tags:
 *   name: Gastos
 *   description: Gerenciamento dos gastos pessoais
 *
 * components:
 *   schemas:
 *     Gasto:
 *       type: object
 *       properties:
 *         gas_id:
 *           type: integer
 *           example: 1
 *         gas_descricao:
 *           type: string
 *           example: Almoço
 *         gas_valor:
 *           type: string
 *           example: "35.90"
 *         gas_data:
 *           type: string
 *           format: date
 *           example: "2026-11-11"
 *         cat_id:
 *           type: integer
 *           example: 1
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *     GastoEntrada:
 *       type: object
 *       required:
 *         - gas_descricao
 *         - gas_valor
 *         - cat_id
 *       properties:
 *         gas_descricao:
 *           type: string
 *           maxLength: 100
 *           example: Almoço
 *         gas_valor:
 *           type: number
 *           example: 35.90
 *         gas_data:
 *           type: string
 *           format: date
 *           description: Opcional. Se não informada, usa a data atual.
 *           example: "2026-11-11"
 *         cat_id:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /gastos:
 *   get:
 *     summary: Lista todos os gastos com a categoria (ordenados por data desc)
 *     tags: [Gastos]
 *     responses:
 *       200:
 *         description: Lista de gastos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gasto'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *   post:
 *     summary: Cadastra um novo gasto
 *     tags: [Gastos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GastoEntrada'
 *     responses:
 *       201:
 *         description: Gasto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gasto'
 *       400:
 *         description: Dados inválidos ou categoria inexistente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro no servidor
 *
 * /gastos/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID do gasto
 *   get:
 *     summary: Busca um gasto pelo ID
 *     tags: [Gastos]
 *     responses:
 *       200:
 *         description: Gasto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gasto'
 *       404:
 *         description: Gasto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro no servidor
 *   put:
 *     summary: Atualiza um gasto
 *     tags: [Gastos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GastoEntrada'
 *     responses:
 *       200:
 *         description: Gasto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gasto'
 *       400:
 *         description: Dados inválidos ou categoria inexistente
 *       404:
 *         description: Gasto não encontrado
 *       500:
 *         description: Erro no servidor
 *   delete:
 *     summary: Exclui um gasto
 *     tags: [Gastos]
 *     responses:
 *       200:
 *         description: Gasto excluído
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       404:
 *         description: Gasto não encontrado
 *       500:
 *         description: Erro no servidor
 */
