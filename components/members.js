import { useRouter } from 'next/router';
import Link from 'next/link';

function Members({ member }) {
    const router = useRouter();

    // Format the date of birth in the required format
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(member.dob.date));

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="member-card">
            <h1>{`${member.name.first} ${member.name.last}`}</h1>
            <img src={member.picture.large} alt={`${member.name.first} ${member.name.last}`} />
            <p>{member.location.street.number} {member.location.street.name}</p>
            <p>{`${member.location.city}, ${member.location.state} ${member.location.postcode}`}</p>
            <a href={`mailto:${member.email}`}>{member.email}</a>
            <p>Phone: {member.phone}</p>
            <p>Cell: {member.cell}</p>
            <p>DOB: {formattedDate}</p> {/* Display the formatted date here */}
            <Link href="/">
                <a className="back-button">Back</a>
            </Link>
        </div>
    );
}

export default Members;
