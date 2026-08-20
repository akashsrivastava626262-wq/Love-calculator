import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      collection,
      search,
      sort = 'createdAt',
      order = 'desc',
      minPrice,
      maxPrice,
      isBestSeller,
      isNewArrival,
      isFlashSale,
      isFeatured,
    } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (collection) filter.collection = collection;
    if (isBestSeller) filter.isBestSeller = true;
    if (isNewArrival) filter.isNewArrival = true;
    if (isFlashSale) filter.isFlashSale = true;
    if (isFeatured) filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const sortObj = { [sort]: order === 'asc' ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
      isActive: true,
    }).populate('category', 'name slug')
      .populate('frequentlyBoughtWith');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.viewCount += 1;
    await product.save();

    const similar = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    }).limit(8);

    res.json({
      success: true,
      product,
      similar,
      stockStatus: product.getStockStatus(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('order');
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const products = await Product.find({ category: category._id, isActive: true });
    res.json({ success: true, category, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, title, comment, images } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.reviews.push({
      user: req.user._id,
      rating,
      title,
      comment,
      images,
      isApproved: true,
    });

    const approved = product.reviews.filter((r) => r.isApproved);
    product.reviewCount = approved.length;
    product.averageRating = approved.reduce((sum, r) => sum + r.rating, 0) / approved.length || 0;
    await product.save();

    res.json({ success: true, reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const smartSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, products: [], categories: [] });

    const [products, categories] = await Promise.all([
      Product.find({
        isActive: true,
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { tags: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
        ],
      }).limit(10).populate('category', 'name slug'),
      Category.find({ name: { $regex: q, $options: 'i' }, isActive: true }).limit(5),
    ]);

    res.json({ success: true, products, categories, query: q });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { productId, userId } = req.query;
    let recommendations;

    if (productId) {
      const product = await Product.findById(productId);
      if (product) {
        recommendations = await Product.find({
          $or: [
            { category: product.category },
            { collection: product.collection },
            { tags: { $in: product.tags } },
          ],
          _id: { $ne: productId },
          isActive: true,
        }).limit(8);
      }
    } else {
      recommendations = await Product.find({ isBestSeller: true, isActive: true }).limit(8);
    }

    res.json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bulkImportProducts = async (req, res) => {
  try {
    const { products } = req.body;
    const created = await Product.insertMany(products);
    res.status(201).json({ success: true, count: created.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
