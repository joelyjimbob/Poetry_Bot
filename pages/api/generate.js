import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.prompt, req.body.poemStyle),
    temperature: 0.6,
    max_tokens: 265,
  });
  res.status(200).json({ result: completion.data.choices[0].text.replace(/\\n/g, '<br/>') });
}

function generatePrompt(prompt, poemStyle) {

  if(prompt == ""){
    return "Write this sentence only: I cannot work without a prompt. Please try again.";
  }

  const cleanPrompt =
    prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();


  console.log(poemStyle);
  console.log(prompt);
  if(poemStyle == "Free Verse"){
    return 'Write a 7 line free verse poem about a ' +  cleanPrompt;
  }

  if(poemStyle == "Haiku"){
    var text = 'Dex is a poet known for writing 5-7-5 syllables haikus. The following is an example of a haiku Dex would write about ' +  cleanPrompt + ":";
    console.log("a haiku was written");
    return text;
  }

  if(poemStyle == "Sonnet"){
    return ">Summer\n Shall I compare thee to a summer’s day?\n Thou art more lovely and more temperate:\n Rough winds do shake the darling buds of May,\n And summer’s lease hath all too short a date;\n Sometime too hot the eye of heaven shines,\n And often is his gold complexion dimm'd;\n And every fair from fair sometime declines,\n By chance or nature’s changing course untrimm'd;\n But thy eternal summer shall not fade,\n Nor lose possession of that fair thou ow’st;\n Nor shall death brag thou wander’st in his shade,\n When in eternal lines to time thou grow’st:\n   So long as men can breathe or eyes can see,\n   So long lives this,\n and this gives life to thee.\n\n  >Eyes\n My mistress' eyes are nothing like the sun;\n Coral is far more red than her lips' red;\n If snow be white, why then her breasts are dun;\n If hairs be wires, black wires grow on her head.\n I have seen roses damasked, red and white,\n But no such roses see I in her cheeks;\n And in some perfumes is there more delight\n Than in the breath that from my mistress reeks.\n I love to hear her speak, yet well I know\n That music hath a far more pleasing sound;\n I grant I never saw a goddess go;\n My mistress, when she walks, treads on the ground.\n  And yet, by heaven, I think my love as rare\n   As any she belied with false compare.\n\n  >Year\n That time of year thou mayst in me behold\n When yellow leaves, or none, or few, do hang\n Upon those boughs which shake against the cold,\n Bare ruin'd choirs, where late the sweet birds sang.\n In me thou see'st the twilight of such day\n As after sunset fadeth in the west,\n Which by and by black night doth take away,\n Death's second self, that seals up all in rest.\n In me thou see'st the glowing of such fire\n That on the ashes of his youth doth lie,\n As the death-bed whereon it must expire,\n Consum'd with that which it was nourish'd by.\n This thou perceiv'st, which makes thy love more strong,\n To love that well which thou must leave ere long.\n\n  >" + cleanPrompt;
  }

  if(poemStyle == "Acrostic"){
    return 'These are acrostic poems:\nTheme: CANDY\n"Crunchy chewy\nAwesome\nNice and sweet\nDelightful and delicious\nYummy treat"\n\nTheme: CATS \n"Cuddly \nAcrobatic \nTenacious and terrifying\nSoftly purring"\n\nTheme: FEAR\n"Frightening\nEerie and strange\nAnxiety rises\nReady to flee"\nTheme: ' +  cleanPrompt;
  }

  if(poemStyle == "Limerick"){
    return 'Here are three limericks.\n"There was a small boy of Quebec,\nWho was buried in snow to his neck;\nWhen they said, “Are you friz?”\nHe replied, “Yes, I is—\nBut we don’t call this cold in Quebec."\n\n"There was a Young Lady of Ryde,\nWhose shoe-strings were seldom untied.\nShe purchased some clogs,\nAnd some small spotted dogs,\nAnd frequently walked about Ryde."\n\n"A dozen, a gross, and a score\nPlus three times the square root of four\nDivided by seven\nPlus five times eleven\nIs nine squared and not a bit more."\n\nwrite a limerick about ' +  cleanPrompt;
  }

  if(poemStyle == "Ode"){
    return 'Write an ode to ' + cleanPrompt;
  }

  if(poemStyle == "Elegy"){
    return 'Write an elegy about a ' +  cleanPrompt;
  }

  if(poemStyle == "Ballad"){
    return 'Here are three ballad poems:\n"I met a lady in the meads\nFull beautiful, a faery’s child;\nHer hair was long, her foot was light,\nAnd her eyes were wild"\n\n“Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.”\n\n“O my Luve is like a red, red rose\nThat’s newly sprung in June;\nO my Luve is like the melody\nThat’s sweetly played in tune”\n\nWrite a ballad about a ' + cleanPrompt;
  }

  console.log("No style detected");
  return `Write a long poem about a ${cleanPrompt}.`;
}
