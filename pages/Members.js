import { useState } from 'react'
import Link from 'next/link'

function Members({ members, setMembers }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false)

    const handleClick = async e => {
        setLoading(true)

        try {
            const res = await fetch('https://randomuser.me/api/')
            const data = await res.json()

            console.log('Search term:', e.target.value);
            setSearchTerm(e.target.value);
            setLoading(false)

            // Add the new member to the list of members
            const newMember = data.results[0]
            setMembers(members => [newMember, ...members])
            // Store updated members list in local storage
            localStorage.setItem('members', JSON.stringify([newMember, ...members]))
        } catch (error) {
            console.log('Error:', error.message);
            setLoading(false)
        }
    }

    // Filter members based on search term and sort by first name
    const filteredMembers = members
        .filter(member => {
            const fullName = `${member.name.first} ${member.name.last}`
            return searchTerm ? fullName.toLowerCase().includes(searchTerm.toLowerCase()) : true
        })
        .sort((a, b) => a.name.first.localeCompare(b.name.first))

    return (
        <div className="members-group">
            <input
                type="text"
                placeholder="Search members"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            <ul className="members-list">
                {filteredMembers.map(member => (
                    <li key={member.login.uuid}>
                        <Link href={`/members/${member.login.uuid}`}>
                            <img src={member.picture.thumbnail} alt={`${member.name.first} ${member.name.last}`} />
                        </Link>
                        <p>{`${member.name.first} ${member.name.last}`}</p>
                        <p>{member.dob.age} years old</p>
                    </li>
                ))}
            </ul>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <button onClick={handleClick}>Add Member</button>
            )}
        </div>
    )

}

export async function getStaticProps() {
    const res = await fetch('https://randomuser.me/api/?results=100')
    const data = await res.json()

    return {
        props: {
            members: data.results
        }
    }
}

export default Members
