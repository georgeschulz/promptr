function fillTemplate(template, data) {
    if (typeof template !== 'string' || typeof data !== 'object') {
        return template;
    }

    return template.replace(/\{(\w+)\}/g, (match, key) => data[key]);
}

export default fillTemplate;