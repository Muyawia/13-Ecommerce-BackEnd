const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const TagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(TagData);
  } 
    catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!TagData) {
      res.status(404).json({ message: 'Error: Tag Data Was Not Found!' });
      return;
    }
    res.status(200).json(TagData);
  } 
    catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const TagData = await Tag.create({
    tag_id: req.body.tag_name,
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const TagData = await Tag.save({
      where: {
        id: req.params.id,
      },
    });
         
    if (!TagData) {
      res.status(404).json({ message: 'Error: Tag Data Was Not Found!' });
      return;
    }
    res.status(200).json(TagData);
  } 
    catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: 'Error: Tag Data Was Not Found!' });
      return;
    }

    res.status(200).json(TagData);
  } 
    catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
