public class XMLgen {
    public string xmlstring { get; set;}

    public XMLgen(){
        DOM.Document doc = new DOM.Document();

        dom.XmlNode products = doc.createRootElement('products', null, null);
        dom.XmlNode body1= products.addChildElement('product', null, null);

        body1.addChildElement('Name', null, null).addTextNode('Xbox One');
        body1.addChildElement('Code', null, null).addTextNode('XBO');

        dom.XmlNode body2= products.addChildElement('product', null, null);

        body2.addChildElement('Name', null, null).addTextNode('PlayStation 4');
        body2.addChildElement('Code', null, null).addTextNode('PS4');

        dom.XmlNode body3= products.addChildElement('product', null, null);

        body3.addChildElement('Name', null, null).addTextNode('WII');
        body3.addChildElement('Code', null, null).addTextNode('Wii');

        xmlstring = doc.toXmlString();
    }
}