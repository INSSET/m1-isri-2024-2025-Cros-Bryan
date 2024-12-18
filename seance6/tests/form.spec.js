import { Selector } from 'testcafe';

const baseUrl = 'http://127.0.0.1:8080'; // URL locale du nano-site

fixture`Tests E2E`
    .page`${baseUrl}`;

test('Ajout de données valides', async t => {
    const nameInput = Selector('#name'); 
    const firstNameInput = Selector('#firstname');
    const submitButton = Selector('#submit');
    const successList = Selector('#success-list');

    await t
        .typeText(nameInput, 'Doe')
        .typeText(firstNameInput, 'John')
        .click(submitButton);

    // Vérifier que l'entrée apparaît dans la liste des succès
    await t.expect(successList.innerText).contains('Doe, John');
});

test('Ajout de données invalides', async t => {
    const nameInput = Selector('#name');
    const submitButton = Selector('#submit');
    const errorMessage = Selector('#error-message');

    // Tester avec un champ vide
    await t
        .selectText(nameInput)
        .pressKey('delete') // Effacer tout contenu existant
        .click(submitButton);

    // Vérifier que le message d'erreur s'affiche correctement
    await t.expect(errorMessage.innerText).contains('Le nom est requis');
});
