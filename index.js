const sampleText = "lorem ipsum dolor sit amet consectetur lorem ipsum et mihi quoniam et adipiscing elit.sed quoniam et advesperascit et mihi ad villam revertendum est nunc quidem hactenus ex rebus enim timiditas non ex vocabulis nascitur.nummus in croesi divitiis obscuratur pars est tamen divitiarum.nam quibus rebus efficiuntur voluptates eae non sunt in potestate sapientis.hoc mihi cum tuo fratre convenit.qui ita affectus beatum esse numquam probabis duo reges constructio interrete.de hominibus dici non necesse est.eam si varietatem diceres intellegerem ut etiam non dicente te intellego parvi enim primo ortu sic iacent tamquam omnino sine animo sint.ea possunt paria non esse.quamquam tu hanc copiosiorem etiam soles dicere.de quibus cupio scire quid sentias.universa enim illorum ratione cum tota vestra confligendum puto.ut nemo dubitet eorum omnia officia quo spectare quid sequi quid fugere debeant nunc vero a primo quidem mirabiliter occulta natura est nec perspici nec cognosci potest.videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur sunt enim prima elementa naturae quibus auctis virtutis quasi germen efficitur.nam ut sint illa vendibiliora haec uberiora certe sunt.cur deinde metrodori liberos commendas.mihi inquam qui te id ipsum rogavi nam adhuc meo fortasse vitio quid ego quaeram non perspicis.quibus ego vehementer assentior.cur iustitia laudatur mihi enim satis est ipsis non satis.quid est enim aliud esse versutum nobis heracleotes ille dionysius flagitiose descivisse videtur a stoicis propter oculorum dolorem.diodorus eius auditor adiungit ad honestatem vacuitatem doloris.nos quidem virtutes sic natae sumus ut tibi serviremus aliud negotii nihil habemus."

// Helper functions
const wordCountTrackerGenerator = (wordList) => wordList.reduce((trackerObject, word) => {
    if (trackerObject[word]) {
        trackerObject[word] += 1;
    } else {
        trackerObject[word] = 1;
    }
    return trackerObject;
}, {})

const sortedTopStrings = (wordCountTracker) => Object.keys(wordCountTracker).sort((a,b) => wordCountTracker[b] - wordCountTracker[a]);

// Calculated values
const wordList = sampleText.split(/[\s\.]+/).filter(Boolean);
const twoWordPhraseList = wordList.map((word, index) => index !== wordList.length - 1 ? [word, wordList[index + 1]].join(" ") : null).filter(Boolean);
const sentenceList = sampleText.split(/[\.]+/).filter(Boolean);
const wordCountTracker = wordCountTrackerGenerator(wordList);
const wordsSortedByInstanceCount = sortedTopStrings(wordCountTracker);
const countOfOneInstanceWords = Object.keys(wordCountTracker).reduce((count, word) => wordCountTracker[word] === 1 ? count + 1 : count, 0);
const sentenceWordCountList = sentenceList.map(sentence => sentence.split(/[\s]+/).length);

// Answers
const wordCount = wordList.length;
const sentenceCount = sentenceList.length
const lengthOfLongestWord = wordList.reduce((longestLetterCount, word) => word.length > longestLetterCount ? word.length : longestLetterCount, 0);
const topSixWords = wordsSortedByInstanceCount.slice(0,6);
const percentageOfOneInstanceWords = countOfOneInstanceWords / wordCount * 100;
const averageWordsPerSentence = sentenceWordCountList.reduce((sum, wordCount) => sum + wordCount, 0) / sentenceList.length;
const topThreeTwoWordPhrases = sortedTopStrings(wordCountTrackerGenerator(twoWordPhraseList)).slice(0,3);
const topFiveProminence = wordsSortedByInstanceCount.slice(0, 5).reduce((prominenceTracker, refWord) => {
    const { positionSum, positionsNum } = wordsSortedByInstanceCount.reduce((positionTracker, word, index) => {
        if (word === refWord) {
            positionTracker.positionSum += index + 1;
            positionTracker.positionsNum += 1;
        }
        return positionTracker;
    }, { positionSum: 0, positionsNum: 0 });
    prominenceTracker[refWord] = (wordCount - ((positionSum - 1) / positionsNum)) * (100 / wordCount);
    return prominenceTracker;
}, {})

// Logs of answers
console.log('wordCount ', wordCount);
console.log('sentenceCount ', sentenceCount);
console.log('lengthOfLongestWord ', lengthOfLongestWord);
console.log('topSixWords ', topSixWords);
console.log('percentageOfOneInstanceWords ', percentageOfOneInstanceWords);
console.log('averageWordsPerSentence ', averageWordsPerSentence);
console.log('topThreeTwoWordPhrases ', topThreeTwoWordPhrases);
console.log('topFiveProminence', topFiveProminence);