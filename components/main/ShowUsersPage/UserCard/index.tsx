import { usePublicRecord } from "@self.id/framework";
import Link from "next/link";
import Card from "../../../shared/Card";

interface UserCard {
  did: string;
  address: string;
}
const UserCard = ({ did, address }: UserCard) => {
  const { content, isLoading, isError, error } = usePublicRecord(
    "basicProfile",
    did
  );
  return (
    <div>
      {content && (
        <Link href={`/profile/${address}`}>
          <Card
            title={content.name}
            description={content.description}
            image={content.image?.original.src}
          ></Card>
        </Link>
      )}
    </div>
  );
};

export default UserCard;
