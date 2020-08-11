import React from 'react'
import './LeaderBoard.css';
import LeaderBoardUser from './LeaderBoardUser';

function LeaderBoard() {
    return <div className="leaderBoard">
        <div className="leaderBoard__header">Season 8 of 2020 Rank <i className="leaderBoard__trophy nes-icon trophy is-small"></i></div>
        <div className="leaderBoard__users">
            <LeaderBoardUser rank={1} username="Sona" winnings={2654750} rounds={560} />
            <LeaderBoardUser rank={2} username="DatGuy" winnings={2301250} rounds={542} />
            <LeaderBoardUser rank={3} username="AdmiralBulldog" winnings={2007250} rounds={503} />
            <LeaderBoardUser rank={4} username="GorgC" winnings={1502200} rounds={409} />
            <LeaderBoardUser rank={5} username="Joe Rogan" winnings={1208990} rounds={400} />
            <LeaderBoardUser rank={6} username="Bill Burr" winnings={856770} rounds={365} />
            <LeaderBoardUser rank={7} username="Jesus Christ" winnings={420550} rounds={322} />
            <LeaderBoardUser rank={8} username="Mario" winnings={127720} rounds={321} />
            <LeaderBoardUser rank={9} username="ToxicFlower" winnings={97320} rounds={354} />
            <LeaderBoardUser rank={10} username="Fudge" winnings={85220} rounds={260} />
            <LeaderBoardUser rank={11} username="Kever" winnings={76750} rounds={266} />
            <LeaderBoardUser rank={12} username="PhoenixGold" winnings={76420} rounds={241} />
            <LeaderBoardUser rank={13} username="Moose" winnings={72990} rounds={120} />
            <LeaderBoardUser rank={14} username="Miguel" winnings={60290} rounds={100} />
            <LeaderBoardUser rank={15} username="Umma" winnings={55030} rounds={98} />
            <LeaderBoardUser rank={16} username="Kota the Friend" winnings={22000} rounds={92} />
            <LeaderBoardUser rank={17} username="Mac Miller" winnings={18090} rounds={51} />
        </div>
    </div>
}

export default LeaderBoard
