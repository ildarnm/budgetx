import { Budget, BudgetId } from '../models/budget';
import Repository from './repository';
import { delay } from '../delay';
import { Injectable } from '@angular/core';
import { budgets_db, } from '@shared/repositories/mocks';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GetNormalizedBudgetDto } from "@shared/repositories/dto/get-normalized-budget.dto";
import { CreateNormalizedBudgetDto } from "@shared/repositories/dto/create-normalized-budget.dto";
import { UpdateBudgetDto } from "@shared/repositories/dto/update-budget.dto";

@Injectable({ providedIn: 'root' })
export class BudgetRepository extends Repository<Budget> {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getAll(): Observable<Budget[]> {
    return this.httpClient.get<Budget[]>('/api/budgets');
  }

  public create(createNormalizedBudgetDto: CreateNormalizedBudgetDto): Observable<void> {
    return this.httpClient.post<void>('/api/budgets', createNormalizedBudgetDto);
  }

  public find(budgetId: string): Observable<GetNormalizedBudgetDto> {
    return this.httpClient.get<GetNormalizedBudgetDto>(`/api/budgets/${budgetId}`);
  }

  public update(id: BudgetId,  budget: UpdateBudgetDto): Observable<void> {
    return this.httpClient.patch<void>(`/api/budgets/${id}`, budget);
  }
}
