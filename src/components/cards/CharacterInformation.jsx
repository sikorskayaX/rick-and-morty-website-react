import React from 'react';

const CharacterInformation = ({title, info, className = 'character__information'}) => {
    return(
        <div className= {className}>
            <p className='character__info-title'>{title}</p>
            <p className='small'>{info || 'unknown' }</p>
        </div>
      )
}
export default CharacterInformation;