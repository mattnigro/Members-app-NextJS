import React from 'react'

function MemberProfile({ member }) {
    return (
        <div className="member-profile">
            <img src={member.picture.large} alt={member.name.first} />
            <h1>{`${member.name.first} ${member.name.last}`}</h1>
            <p>{`${member.location.street.number} ${member.location.street.name}`}</p>
            <p>{`${member.location.city}, ${member.location.state} ${member.location.postcode}`}</p>
            <p>{member.email}</p>
            <p>{member.phone}</p>
            <p>{member.dob.date}</p>
        </div>
    )
}

export default MemberProfile
