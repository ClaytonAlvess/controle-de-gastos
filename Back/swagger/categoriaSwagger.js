/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento das categorias de gastos
 *
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         cat_id:
 *           type: integer
 *           example: 1
 *         cat_nome:
 *           type: string
 *           example: Alimentação
 *     CategoriaEntrada:
 *       type: object
 *       required:
 *         - cat_nome
 *       properties:
 *         cat_nome:
 *           type: string
 *           maxLength: 50
 *           example: Saúde
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *   post:
 *     summary: Cadastra uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaEntrada'
 *     responses:
 *       201:
 *         description: Categoria criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Dados inválidos ou nome já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro no servidor
 *
 * /categorias/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID da categoria
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro no servidor
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaEntrada'
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Dados inválidos ou nome já cadastrado
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro no servidor
 *   delete:
 *     summary: Exclui uma categoria (somente se não possuir gastos)
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Categoria excluída
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       400:
 *         description: Categoria possui gastos e não pode ser excluída
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro no servidor
 */
