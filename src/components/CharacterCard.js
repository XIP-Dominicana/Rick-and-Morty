import React from 'react';
import '../styles.css';

function CharacterCard(props) {
    const { character } = props;
    return(
        <div
            className="CharacterCard"
            style={{backgroundImage : `url(${character.image})`}}>
            <div className="CharacterCard__name-container text-truncate">
                {character.name}
            </div>
        </div>
    );
}

export default CharacterCard;