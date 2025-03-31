export default {
    LAST_CHECKED_USER: 'SELECT * FROM users ORDER BY last_checked ASC LIMIT 1',
    DELETE_ALL_FROM_USER: 'DELETE FROM collection WHERE user = \'[USER]\'',
    UPDATE_LAST_CHECKED_USER: 'UPDATE users SET last_checked = NOW() WHERE user = \'[USER]\''
}