// # Description:
// # Insult your colleages tastefully
// #
// # Dependencies:
// #   None
// #
// # Configuration:
// #   None
// #
// # Commands:
// #   hubot insult @username - Shows a tastefully insult
// #
// # Author:
// #   PiXeL16 <cjimenez16@gmail.com> Chris Jimenez


const insults = [
	"May the chocolate chips in your cookies always turn out to be raisins.",
	"May every sock you wear be slightly rotated, just enough for it to be uncomfortable.",
	"May your mother come to talk to you, and then leave your door slightly ajar, so that you have to get up and close it.",
	"May your article load that extra little bit as you're about to click a link so you click an ad instead.",
	"May both sides of your pillow be warm.",
	"May you forever feel your cellphone vibrating in the pocket it's not even in.",
	"May you always get up from your computer with your headphones still attached.",
	"May your chair produce a sound similar to a fart, but only once, such that you cannot reproduce it to prove that it was just the chair.",
	"I don’t believe in plastic surgery, But in your case, Go ahead.",
	"People like you are the reason we have middle fingers.",
	"Why Don’t You Slip Into Something More Comfortable. Like A Coma?",
	"When your mom dropped you off at the school, she got a ticket for littering.",
	"Tell me… Is being stupid a profession or are you just gifted?",
	"Me pretending to listen should be enough for you.",
	"What’s the point of putting on makeup, a monkey is gonna stay a monkey.",
	"My mom says pigs don’t eat biscuits… So I better take that one out of your hand.",
	"No need for insults, your face says it all.",
	"You’re so ugly that when you cry, the tears roll down the back of your head…just to avoid your face.",
	"Wow! You have a huge pimple in between your shoulders! Oh wait that’s your face.",
	"It’s not that you are weird…it’s just that everyone else is normal.",
	"Zombies eat brains. You’re safe.",
	"Scientists are trying to figure out how long human can live without a brain. You can tell them your age.",
	"Roses are red, violets are blue, I have 5 fingers, the 3rd ones for you.",
	"Is your ass jealous of the amount of shit that just came out of your mouth?",
	"Your birth certificate is an apology letter from the condom factory.",
	"I’m jealous of all the people that haven't met you!",
	"I wasn't born with enough middle fingers to let you know how I feel about you.",
	"You must have been born on a highway because that's where most accidents happen.",
	"If you are going to be two faced, at least make one of them pretty.",
	"Yo're so ugly, when your mom dropped you off at school she got a fine for littering.",
	"I bet your brain feels as good as new, seeing that you never use it.",
	"You bring everyone a lot of joy, when you leave the room.",
	"Two wrongs don't make a right, take your parents as an example.",
	"I'd like to see things from your point of view but I can't seem to get my head that far up my ass.",
	"I could eat a bowl of alphabet soup and shit out a smarter statement than that.",
	"If I wanted to kill myself I'd climb your ego and jump to your IQ.",
	"If laughter is the best medicine, your face must be curing the world.",
	"If you're gonna be a smartass, first you have to be smart. Otherwise you're just an ass.",
	"You're so ugly, when you popped out the doctor said Aww what a treasure and your mom said Yeah, lets bury it.",
	"I don't exactly hate you, but if you were on fire and I had water, I'd drink it.",
	"It's better to let someone think you are an Idiot than to open your mouth and prove it.",
	"Shut up, you'll never be the man your mother is.",
	"You shouldn't play hide and seek, no one would look for you.",
	"The last time I saw a face like yours I fed it a banana.",
	"Maybe if you ate some of that makeup you could be pretty on the inside.",
	"Hey, you have somthing on your chin... no, the 3rd one down",
	"http://i.imgur.com/9IZACjN.jpg",
	"http://i.imgur.com/ftc2h0p.jpg",
	"http://i.imgur.com/QEb2GaS.jpg",
	"http://i.imgur.com/LHQ5FXf.jpg",
	"http://i.imgur.com/rNW9J0D.jpg",
	"http://i.imgur.com/D6SpawO.jpg",
	"I'd slap you, but shit stains.",
	"If I were to slap you, it would be considered animal abuse!",
	"Why don't you slip into something more comfortable -- like a coma.",
	"I have neither the time nor the crayons to explain this to you.",
	"You look like something I'd draw with my left hand.",
	"If you really want to know about mistakes, you should ask your parents.",
	"What are you doing here? Did someone leave your cage open?",
	"You're not funny, but your life, now that's a joke.",
	"You're as useless as a knitted condom.",
	"Oh my God, look at you. Was anyone else hurt in the accident?",
	"You're so fat, you could sell shade.",
	"You're as bright as a black hole, and twice as dense.",
	"You're so ugly, when you got robbed, the robbers made you wear their masks.",
	"You are proof that evolution CAN go in reverse.",
	"Do you still love nature, despite what it did to you?",
	"You're so ugly, the only dates you get are on a calendar.",
	"Shock me, say something intelligent.",
	"Learn from your parents' mistakes - use birth control!",
	"http://i.imgur.com/slGGjh9.png",
	"http://i.imgur.com/ijuqlp7.png",
	"http://i.imgur.com/riHJxSx.png",
	"http://i.imgur.com/21vNjxl.png",
	"http://i.imgur.com/XlMRGDE.png",
	"http://i.imgur.com/y9iuoKk.png",
	"http://i.imgur.com/zmU7RBF.png",
	"http://i.imgur.com/nrLtb7S.png",
	"http://i.imgur.com/m0U288v.gif",
	"http://i.imgur.com/W5LGPj7.gif",
	"http://i.imgur.com/GZfjPDH.gif",
	"http://i.imgur.com/TM0qYRi.gif",
	"http://i.imgur.com/dUb0C1V.gif",
	"http://i.imgur.com/WFdLzo9.gif",
	"http://i.imgur.com/doE0ChC.gif",
	"http://i.imgur.com/Jal12NU.gif",
	"http://i.imgur.com/SOEQQ6m.gif",
	"http://i.imgur.com/OJkjPnP.gif",
	"http://i.imgur.com/CjTPuvh.gif",
	"http://i.imgur.com/5cpGsja.gif",
	"http://i.imgur.com/23J4RqC.gif",
	"http://i.imgur.com/m7qUTLq.gif",
	"http://i.imgur.com/qwk5kKT.gif",
	"http://i.imgur.com/6b9OqaI.gif",
	"http://i.imgur.com/mcL83zN.gif",
	"http://i.imgur.com/bwzg7nr.gif",
	"http://i.imgur.com/H92PB5P.gif",
	"http://i.imgur.com/8sqhwOg.gif",
	"http://i.imgur.com/WPGwXHq.gif",
	"http://i.imgur.com/cOVQQq6.gif",
	"http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN1.png",
	"http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN2.png",
	"http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN4.png",
	"http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN5.png",
	"http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN6.jpg",
	"http://i.imgur.com/dMDdQOI.gif",
	"http://i.imgur.com/4PhyZKv.gif",
	"http://i.imgur.com/6OGiTqc.gif",
	"http://i.imgur.com/WtDpHiL.gif",
	"http://i.imgur.com/7PIIlI7.gif",
	"http://replygif.net/i/186.gif",
	"http://i.imgur.com/TLDBTeV.gif",
	"http://i.imgur.com/HegZkkc.gif",
	"http://i.imgur.com/clcdkfP.gif",
	"http://i.imgur.com/c5yeWVx.gif",
	"http://i.imgur.com/IG4Evs9.gif",
	"http://i.imgur.com/VJCWcnK.gif",
	"http://i.imgur.com/QFrk1X5.gif",
	"http://i.imgur.com/kXGUKwD.gif",
	"http://i.imgur.com/Jnit9mq.gif",
	"http://i.imgur.com/iQjNakW.gif",
	"http://i.imgur.com/5Zfltup.gif",
	"http://i.imgur.com/OdYTqoB.gif",
	"http://i.imgur.com/LCy4zVv.gif",
	"http://i.imgur.com/DZ64Fu7.gif",
	"http://i.imgur.com/DAzfQh6.gif",
	"http://i.imgur.com/R8Ou2cj.gif",
];

module.exports = (robot) => {
	robot.respond(/insult (.+)/i, (msg) => {
		let who = msg.match[1].trim();
		const insult = msg.random(insults);
		if (/^(yourself|hubot|you)/.test(who)) {
			msg.reply("I would, but I think too highly of myself");
			return;
		}

		if (/^me$/.test(who)) {
			msg.reply(insult);
			return;
		}

		if (/^(someone|somebody|anyone)$/.test(who)) {
			const active = Object.values(robot.brain.data.users).
				filter((user) => !(user.slack && user.slack.deleted));

			who = msg.random(active).name;
		}

		msg.send(`${who}, ${insult}`);
	});
};
