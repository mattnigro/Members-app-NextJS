import React from 'react';

const MemberCard = ({ member }) => {
    return (
        <div>
            <img src={member.picture.thumbnail} alt={`${member.name.first} ${member.name.last}`} />
            <p>{`${member.name.first} ${member.name.last}`}</p>
            <p>{`Age: ${member.dob.age}`}</p>
        </div>
    );
};

export default MemberCard;
