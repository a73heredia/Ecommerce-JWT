import ProductModel from '../models/product.js';
import Products from '../dao/product.js';
import CommonsUtils from '../utils/common.js'


class ProductController {
    // static async create(req, res) {
    //     const data = req.body;
    //     const result = await ProductModel.create(data);
    //     res.status(201).send(result);
    // }
    //   static create = async(req, res, next) => {
    //     const { body } = req
    //     console.log(body);
    //     try {
    //         const product = await Products.createProduct(body)
    //         res.status(201).json(product)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    static async create(req, res) {
      const { body } = req;
    
      // Verificar si el usuario es premium o no
      const isPremiumUser = req.user.role === 'premium';
    
      // Establecer el owner del producto según el tipo de usuario
      const owner = isPremiumUser ? req.user.email : 'admin';
    
      // Agregar el campo owner al cuerpo del producto
      const productData = {
        ...body,
        owner: owner
      };
    
      const result = await Products.createProduct(productData);
      res.status(201).json(result);
    }
    // static async get(req, res) {
    //     const result = await ProductModel.find();
    //     res.status(201).send(result);
    //     const { query: {limit = 5, page = 1} } = req
    //     const options = {
    //       limit,
    //       page
    // }
    // const products = await ProductModel.paginate({}, options);
    // res.json(CommonsUtils.buildResponse(products))
    // }

      static get =  async(req, res, next) => { 
        try {
            const result = await Products.getProducts()
            const { query: {limit = 5, page = 1 } } = req
            const options = {
                limit,
                page
            }
            const products = await ProductModel.paginate({}, options)
            res.json(CommonsUtils.buildResponse(products))
            
        } catch (error) {
            next(error)
        }
    }

    // static async getById(req, res) {
    //     const id = req.params.id
    //     console.log(id)
    //     const result = await ProductModel.findById(id)
    //     if (!result) {
    //       return res.status(404).end()
    //     }
    //     res.status(200).json(result)
    //   }

    static getById = async(req, res, next) => {
      try {
          const product = await Products.getProductById(req.params.id)
          res.status(200).json(product)
      } catch (error) {
          next(error)
      }
  }

    // static async updateById(req, res) {
    //     const { params: { id }, body } = req
    //     await ProductModel.updateOne({ _id: id }, { $set: body })
    //     res.status(204).end()
    // }

    

    // static async deleteById(req, res) {
    //     const { params: { id } } = req
    //     await ProductModel.deleteOne({ _id: id })
    //     res.status(204).end()
    //   }

    //MODIFICO UN PRODUCTO POR ID
  static async updateById(req, res) {
    const id = req.params.id;
    const data = req.body;
  
    // Verificar si el usuario es premium o admin
    // const isAdmin = req.user.role === 'admin';
    // const isPremiumUser = req.user.role === 'premium';
  
    // Obtener el owner actual del producto
    const product = await Products.getProductById(id);
    if (!product) {
      return res.status(404).end();
    }
  
    // Verificar si el usuario puede actualizar el producto
    // if (!(isAdmin || (isPremiumUser && product.owner === req.user.email))) {
    //   return res.status(403).json({ message: 'No tienes permiso para actualizar este producto' });
    // }
  
    await Products.updateProductById(id, data);
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  }
  //ELIMINO UN PRODUCTO POR ID
  static async deleteById(req, res) {
    const id = req.params.id;
  
    // Verificar si el usuario es admin
    //const isAdmin = req.user.role === 'admin';
  
    // Obtener el owner actual del producto
    const product = await Products.getProductById(id);
    if (!product) {
      return res.status(404).end();
    }
  
    // Verificar si el usuario puede eliminar el producto
    // if (!(isAdmin || product.owner === req.user.email)) {
    //   return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
    // }
  
    await Products.deleteProductById({ _id: id });
    res.status(204).end();
  }

        //FILTRO POR CATEGORIA
  static async filtroCategory(req, res) {
    const { params: { category } } = req;
    const result = await ProductModel.aggregate([
      { $match: { category: category } },
      {
        $group: {
          _id: 1,
          productos: { $push: { name: "$name", description: "$description", price: "$price", stock: "$stock" } }
        }
      }
    ],

    )
    res.status(200).json(result)
  }
  //FILTRO POR LIMITE, PAGINA, SORT
 static async paginate(req,res){
    const {query: {limit=1, page=1, sort}} = req;
    const options ={
        limit,
        page
    }
    if(sort){
      options.sort = {price: sort}
    }
    const result = await ProductModel.paginate({},options);
    res.status(200).json(commonsUtils.busResponds(result))
    
}

}


export default ProductController;
