class NoMoreAnnoyingTitlesClient {
	constructor(mod) {
		this.achieves = {};
		mod.clientInterface.once("ready", async () => {
			mod.queryData("/AchievementList/Achievement@grade=?/", [effect.attributes.grade], true).then(achievements => {
				achievements.forEach(achievement => {
					const rewardList = achievement.children.find(x => x.name === "RewardList");
					if(rewardList && rewardList.children.find(x => x.name === "TitleReward"))
						achieves[achievement.attributes.id] = true;
					});
			});
		});
	}
}

module.exports = function NoMoreAnnoyingTitles(mod) {
	const removeTitle = (event) => {
		if(mod.clientMod.achieves[event.title]) {
			event.title = 0;
			return true;
		}
	};

	mod.hook("S_SPAWN_USER", 17, removeTitle);
	mod.hook("S_UNICAST_TRANSFORM_DATA", 6, removeTitle);
}

exports.ClientMod = NoMoreAnnoyingTitlesClient;
exports.NetworkMod = NoMoreAnnoyingTitles;