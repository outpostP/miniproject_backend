const { Op } = require('sequelize');
const db = require('../../models');
const blogs = db.blog;
const blogCategories = db.blogCategory;
const blogKeyword = db.blogKeywords;

async function createBlogEntry(req, title, content, videolink, id_category, country, transaction) {
  const blog = await blogs.create(
    {
      title,
      content,
      imgBlog: req.file.path,
      id_user: req.user.id,
      id_category,
      videoUrl: videolink,
      country,
    },
    { transaction }
  );

  return blog;
}

async function createBlogKeywords(blog, keywords, transaction) {
  if (keywords && Array.isArray(keywords)) {
    for (const keyword of keywords) {
      await blogKeyword.create(
        {
          id_blog: blog.id,
          keywordName: keyword, 
        },
        { transaction }
      );
    }
  } else {
    await blogKeyword.create(
      {
        id_blog: blog.id,
        keywordName: null,
      },
      { transaction }
    );
  }
}

const getPaginationParams = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const buildBlogFilter = (req) => {
  const { id_category, title } = req.query;
  const where = {};
  if (id_category) {
    where.id_category = id_category;
  }
  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }
  return where;
};

const getBlogSortOrder = (req) => {
  const sort = req.query.sort || 'desc';
  return sort === 'asc' ? [['createdAt', 'ASC']] : [['createdAt', 'DESC']];
};

const getBlogsAndInclude = async (where, order, offset, limit) => {
  const includeOptions = [
    { model: blogCategories, attributes: ['category'] },
    { model: blogKeyword, attributes: ['keywordName'] },
  ];

  return await blogs.findAll({
    where,
    order,
    offset,
    limit,
    attributes: {exclude: 'id_category'},
    include: includeOptions,
  });
};


const blogsController = {
  getBlogsQuery : async (req, res) => {
    try {
      const { page, limit, offset } = getPaginationParams(req);
      const where = buildBlogFilter(req);
      const order = getBlogSortOrder(req);
  
      const totalBlog = await blogs.count({ where });
      const dynamicTotPage = Math.ceil(totalBlog / limit);
  
      const blog = await getBlogsAndInclude(where, order, offset, limit);
  
      return res.status(200).json({
        message: "Blogs fetched successfully",
        data: {
          totalPage: dynamicTotPage,
          page: page,
          size: limit,
          data: blog,
        }
      });
    } catch (err) {
      return res.status(500).json({message: 'fetching blog failed'});
    }
  },

  getCategoryId: async (req, res) => {
    try {
    const {id} = req.params;

    const getCat = await blogCategories.findByPk(id, {attributes: ['id', 'category']});

    return res.status(200).json({message: 'success', data: getCat})

  }
  catch (err) {
    return res.status(500).json({
      message: "fetching blog failed",
      error: err.message
  })
  }
},

getCategory: async (req, res) => {
  try {
  
  const getCat = await blogCategories.findAll({attributes: ['id', 'category']});

  return res.status(200).json({message: 'success', data: getCat})

}
catch (err) {
  return res.status(500).json({
    message: "fetching blog failed",
    error: err.message
})
}
},

  getBlogId: async (req,res) => {
    try{
      const {id} = req.params;

      const getBlog = await blogs.findByPk(id, {
        include: [
          { model: blogCategories, attributes: ['category'] },
          { model: blogKeyword, attributes: ['keywordName'] }
        ]
      });

      return res.status(200).json({message: 'success', data: getBlog})

    }
    catch (err) {
      return res.status(500).json({
        message: "fetching blog failed",
        error: err.message
    })
    }
  },

  createBlog: async (req, res) => {
    const { title, content, country, videoUrl, id_category, keywords } = req.body;
    const videolink = videoUrl || null;
    try {
      const newBlog = await db.sequelize.transaction(async (transaction) => {
        const blog = await createBlogEntry(req, title, content, videolink, id_category, country, transaction);
        await createBlogKeywords(blog, keywords, transaction);
  
        return res.status(200).json({message: 'success', data: blog })
      });
    } catch (err) {
      return res.status(500).json({message: 'failed to make blog', error: err});
    }
  }
};
module.exports = blogsController;
