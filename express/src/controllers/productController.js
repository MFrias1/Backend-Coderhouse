import Product from '../models/product.js';

const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Configuración de opciones para la paginación y ordenamiento
    const options = {
      limit: parseInt(limit), 
      page: parseInt(page), 
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
    };

    // Filtro por categoría si se proporciona
    const filter = query ? { category: query } : {}; 

    // Obtención de productos con paginación
    const products = await Product.paginate(filter, options);

    // Respuesta con la paginación y productos
    res.json({
      status: 'success',
      payload: products.docs, 
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export default { getProducts };