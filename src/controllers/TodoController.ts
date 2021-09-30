import { Request, Response } from "express";
import { Todo } from "../models/Todo";

// adiciona uma tarefa
export const create = async (req: Request, res: Response) => {
  if (req.body.title) {
    let newTodo = await Todo.create({
      title: req.body.title,
      done: req.body.done ? true : false,
    });

    res.status(201).json({ newTodo });
  } else {
    res.status(401).json({
      error: "Não foi possivel salvar a tarefa",
    });
  }
};

// lista todas as tarefas
export const readAll = async (req: Request, res: Response) => {
  const list = await Todo.findAll();
  res.json({ list });
};

// lista uma tarefa
export const readOne = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  let todo = await Todo.findByPk(id);
  res.json({ todo })
};


// edita uma tarefa
export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    
    if (todo) {
    
      if (req.body.title) {
        todo.title = req.body.title;
      }
  
      if (req.body.done) {
        
        switch (req.body.done.toLowerCase()) {
          case "true":
          case "1":
            todo.done = true;
            break;
  
          case "false":
          case "0":
            todo.done = false;
            break;
        }
        
      }
      await todo.save()
      res.json({ todo })
  
    } else {
      res.status(401).json({
        error: "Tarefa não encontrada",
      });
    }
};

// deleta uma tarefa
export const del = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let todo = await Todo.findByPk(id)
    if(todo){
        todo.destroy()
    }
    res.json({});
};
