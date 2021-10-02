export class Filme {
  constructor(
    public id :string,
    public alt_description: string,
    public description: string,
    public imagem: string,
    public imagem_reg: string,
    public created_at: string,
    public likes:number | null,
    public downloads:number | null,
    public tags:string[] | null,
    public user:string 
    ) { }
}
