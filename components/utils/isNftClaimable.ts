interface userPlaceCount {
  urban: number;
  nature: number;
  sea: number;
  others: number;
}

export const isNftClaimable = (
  id: string,
  userPlaceCount: userPlaceCount
): boolean => {
  const { urban, nature, sea, others } = userPlaceCount;
  const nftId = parseInt(id);
  switch (nftId) {
    case 0:
      if (urban > 0 || nature > 0 || sea > 0 || others > 0) return true;
      break;
    case 1:
      if (urban >= 10) return true;
      break;

    case 2:
      if (nature >= 10) return true;
      break;

    case 3:
      if (sea >= 10) return true;
      break;

    case 4:
      if (others >= 10) return true;
      break;

    case 5:
      if (urban >= 10 && nature >= 10 && sea >= 10 && others > 10) return true;
      break;
  }
  return false;
};
