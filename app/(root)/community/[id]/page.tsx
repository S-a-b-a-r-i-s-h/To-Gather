import React from 'react'

const CommunityDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  
  return (
    <div>CommunityDetails: { id }</div>
  )
}

export default CommunityDetails