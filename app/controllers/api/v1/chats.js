/**
 * Created by shahqaan on 28/12/2016.
 */

const watson = require('watson-developer-cloud');

module.exports = (router) => {

  router.post('/watson', (req, res) => {

    let conversationOptions = req.app.kraken.get('watson:conversation:credentials');
    conversationOptions.version_date = watson.ConversationV1.VERSION_DATE_2016_09_20;

    const conversation = new watson.ConversationV1(conversationOptions);

    if (!req.body.message) {
      return res.status(400).json({err: 'message required'});
    }

    var payload = {
      workspace_id: req.app.kraken.get('watson:conversation:workspaceId'),
      input: {
        text: req.body.message
      }
    };

    conversation.message(payload, function (err, data) {
      if (err) {
        return res.json({err: err});
      }

      console.log('Received: ', data);

      if (data.context.get_tags) {
        res.json({answer: 'Biotechnology'});
      } else {
        res.json({answer: data.output.text[0]});
      }
    });

  });

};
