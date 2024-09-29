const SEAT_TYPE = {
    BUSINESS: "business",
    ECONOMY: "economy",
    PREMIUM_ECONOMY: "premium-economy",
    FIRST_CLASS: "first-class"
}

const BOOKING_STATUS = {
    BOOKED: "booked",
    CANCELLED: "cancelled",
    INITIATED: "initiated",
    PENDING: "pending"
}

const USER_ROLES = {
    CUSTOMER: "customer",
    ADMIN: "admin",
    FLIGHT_COMPANY: "flight_company"
}

module.exports= {
    SEAT_TYPE,
    BOOKING_STATUS,
    USER_ROLES
}