import ProductosModel from '../models/Product.js'
const getAllWithFilters = async ({ limit = 10, page = 1, query = {}, sort = 'asc' }) => {
    try {
        // Aseguramos que los parámetros sean válidos
        const parsedLimit = isNaN(limit) ? 10 : parseInt(limit);
        const parsedPage = isNaN(page) ? 1 : parseInt(page);
        const parsedSort = sort === 'desc' ? -1 : 1;

        const skip = (parsedPage - 1) * parsedLimit;

        // Realizar la búsqueda con paginación, filtros y ordenamiento
        const products = await ProductosModel.find(query)
            .skip(skip)
            .limit(parsedLimit)
            .sort({ price: parsedSort });

        // Contar los productos para paginación
        const totalProducts = await ProductosModel.countDocuments(query);

        // Calcular la cantidad total de páginas
        const totalPages = Math.ceil(totalProducts / parsedLimit);

        // Definir la paginación
        const hasPrevPage = parsedPage > 1;
        const hasNextPage = parsedPage < totalPages;
        const prevPage = hasPrevPage ? parsedPage - 1 : null;
        const nextPage = hasNextPage ? parsedPage + 1 : null;

        // Preparar las respuestas con paginación y enlaces
        return {
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: parsedPage,
            hasPrevPage,
            hasNextPage,
            prevLink: prevPage ? `/products?limit=${parsedLimit}&page=${prevPage}&sort=${sort}&query=${encodeURIComponent(JSON.stringify(query))}` : null,
            nextLink: nextPage ? `/products?limit=${parsedLimit}&page=${nextPage}&sort=${sort}&query=${encodeURIComponent(JSON.stringify(query))}` : null,
        };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: `Error fetching products: ${error.message}` };  // Mensaje de error más detallado
    }
};

export default { getAllWithFilters };
