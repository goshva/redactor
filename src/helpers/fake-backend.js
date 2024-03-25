export { fakeBackend };

function fakeBackend() {
    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'test2', password: 'test2', firstName: 'Test2', lastName: 'User2' }];
    let articles = [
    { id: 1, username: 'test', password: 'test', firstName: 'Организуем и проведем торги Возьмем на себя подготовку  и оформление документов', lastName: 'Электронная торговая площадка по реализации имущества предприятий банкротов и корпоративных закупок юридическими лицами. Профессионально оказываем услуги для организаторов и участников торгов, а также предоставляем консультационную и юридическую поддержку' },
    { id: 2, username: 'test2', password: 'test2', firstName: 'Торги по банкротству <br> 127-ФЗ', lastName: 'Проведение торгов в электронном виде в соответствии с Федеральным Законом №127-ФЗ «О несостоятельности (банкротстве)»' },
    { id: 3, username: 'test3', password: 'test3', firstName: 'Коммерческие торги <br> ГК РФ, 135-ФЗ', lastName: 'Торги и закупки не противоречаще ГК РФ и 135-ФЗ «О защите конкуренции»' }];

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    case url.endsWith('/articles') && opts.method === 'GET':
                        return getArticles();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body();
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) return error('Username or password is incorrect');

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users);
            }

            function getArticles() {
                if (!isAuthenticated()) return unauthorized();
                return ok(articles);
            }
            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }
        });
    }
}
