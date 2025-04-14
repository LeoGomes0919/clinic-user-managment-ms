export interface IPaginationProps<T> {
  items: T[]
  total: number
  pages: number
  current: number
}

export interface IBaseRepository<T> {
  create(entity: T): Promise<T>
  update(id: string, entity: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
  findById(id: string): Promise<T | null>
  findByCpf(cpf: string): Promise<boolean>
  findAllPaginated(page: number, limit: number): Promise<IPaginationProps<T>>
  findAll(): Promise<T[]>
}
