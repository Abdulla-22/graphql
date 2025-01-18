export const query = `
{
user {
    id
    login
    firstName
    lastName
    email
    campus
    githubId
    transactions(order_by: {amount: desc}, where: {type: {_eq: "level"}}, limit: 1) {
        type
        amount
        progress {
        path
        createdAt
        updatedAt
        }
        object {
        name
        type
        }
    }
    NotFinshProjects: progresses(
        where: {object: {type: {_eq: "project"}}, isDone: {_eq: false}}
    ) {
        id
        grade
        path
        createdAt
        object {
        name
        type
        }
    }
    FinshProjects: progresses(
        order_by: {createdAt: asc}
        where: {object: {type: {_eq: "project"}}, isDone: {_eq: true}}
    ) {
        id
        grade
        path
        createdAt
        updatedAt
        object {
        name
        type
        }
    }
    transactions_aggregate(where: {type: {_eq: "xp"}}) {
        aggregate {
        sum {
            amount
        }
        count
        }
    }
    progresses(
        order_by: {createdAt: asc}
        where: {_and: [{path: {_ilike: "%/bh-module/%"}}, {grade: {_neq: 0}}, {path: {_nlike: "%/piscine-js/%"}}, {path: {_nlike: "%/piscine-go/%"}}]}
    ) {
        id
        grade
        path
        createdAt
        updatedAt
        isDone
        object {
        name
        type
        }
    }
    auditRatio
    totalUp
    totalDown
    projectEx: transactions(
        order_by: {createdAt: asc}
        where: {_and: [{path: {_regex: "^/([^/]+/){2,3}[^/]+$"}}, {type: {_eq: "xp"}}, {progress: {isDone: {_eq: true}}}, {path: {_nlike: "/bahrain/bh-module/piscine-js"}}, {path: {_nlike: "/bahrain/bh-module/piscine-rust"}}], _or: [{path: {_ilike: "/bahrain/bh-module/checkpoint/%"}}, {path: {_ilike: "%/bahrain/bh-module/%"}}]}
    ) {
        id
        type
        amount
        path
        createdAt
        object {
        name
        type
        }
    }
    }
    skills: transaction(where: {type: {_like: "%skill%"}}) {
    amount
    type
    path
    }
}
`;