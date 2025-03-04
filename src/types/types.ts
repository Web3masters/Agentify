export type BadgePropsType = {
    text?: string,
    color: "green" | "red",
}


export type MarketplaceCardBadge = {
    _id: string,
    logo?: string,
    agentName: string,
    category: string,
    verified: boolean,
    creatorName: string,
    agentPurpose: string,
    stats: any,
    buttons: any,
    totalRequests:any,
    availableFunctions:any

}

export type DashboardCardBadge = {
    _id: string,
    logo?: string,
    agentName: string,
    isPublished: boolean,
    creatorName: string,
    showEditButton: boolean,
    agentPurpose: string,
    buttons: any,
    totalRequests:any
    availableFunctions:any
}

export type CardProps = MarketplaceCardBadge | DashboardCardBadge;